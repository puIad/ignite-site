import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/scan-barcode')({
  component: ScanBarcodeComponent,
})

function ScanBarcodeComponent() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const scannerRegionId = 'html5qr-code-full-region'

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch(console.error)
      }
    }
  }, [isScanning])

  const startScanning = async () => {
    setError(null)
    setIsScanning(true)
    setScanResult(null)

    try {
      // Check if cameras are supported
      try {
        const devices = await Html5Qrcode.getCameras()
        if (!devices || devices.length === 0) {
          throw new Error("No camera devices found.")
        }
      } catch (e) {
        throw new Error("Camera access denied or not supported. Please ensure you are using HTTPS or localhost.")
      }

      const html5QrCode = new Html5Qrcode(scannerRegionId)
      scannerRef.current = html5QrCode

      const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      }
      
      // Try environment camera first, fall back to user camera or any camera
      try {
        await html5QrCode.start(
          { facingMode: "environment" }, 
          config,
          (decodedText) => handleScanSuccess(decodedText),
          () => {} // Ignore frame errors
        )
      } catch (envError) {
        console.warn("Environment camera failed, trying default camera...", envError)
        // Fallback to any camera
        await html5QrCode.start(
          { facingMode: "user" }, 
          config,
          (decodedText) => handleScanSuccess(decodedText),
          () => {}
        )
      }
    } catch (err: any) {
      console.error("Error starting scanner:", err)
      const errorMessage = err?.message || "Unknown error occurred"
      setError(`Failed to start camera: ${errorMessage}`)
      setIsScanning(false)
      
      // Cleanup if start failed
      if (scannerRef.current) {
        try {
          await scannerRef.current.clear()
        } catch (e) {
          console.error("Cleanup error:", e)
        }
      }
    }
  }

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop()
        scannerRef.current.clear()
        setIsScanning(false)
      } catch (err) {
        console.error("Error stopping scanner:", err)
      }
    }
  }

  const handleScanSuccess = (decodedText: string) => {
    setScanResult(decodedText)
    stopScanning()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-800">Barcode Scanner</h1>

        {error && (
          <div className="w-full p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <div 
          id={scannerRegionId} 
          className={cn(
            "w-full overflow-hidden rounded-lg bg-gray-100", 
            isScanning ? "block" : "hidden"
          )}
          style={{ minHeight: isScanning ? '300px' : '0' }}
        />

        {!isScanning && (
          <button
            onClick={startScanning}
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow hover:bg-primary/90 transition-colors w-full"
          >
            {scanResult ? 'Scan Again' : 'Scan Barcode'}
          </button>
        )}

        {isScanning && (
          <button
            onClick={stopScanning}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        )}

        {scanResult && !isScanning && (
          <div className="w-full p-4 bg-green-50 border border-green-200 rounded-lg flex flex-col items-center gap-2">
            <span className="text-sm text-green-600 font-medium uppercase tracking-wider">Scanned Result</span>
            <span className="text-xl font-mono font-bold text-gray-800 break-all text-center">{scanResult}</span>
          </div>
        )}
      </div>
    </div>
  )
}
