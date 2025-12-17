'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';

export default function EnvDiagnostic() {
  const [envStatus, setEnvStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const checkEnv = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/check-env', {
        cache: 'no-store'
      });
      const data = await response.json();
      setEnvStatus(data);
    } catch (error) {
      console.error('Failed to check environment variables:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkEnv();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span className="text-sm text-gray-600">Checking configuration...</span>
        </div>
      </div>
    );
  }

  if (!envStatus) {
    return null;
  }

  return (
    <div className={`p-4 rounded-lg border ${
      envStatus.configured
        ? 'bg-green-50 border-green-200'
        : 'bg-yellow-50 border-yellow-200'
    }`}>
      <div className="flex items-start gap-3">
        {envStatus.configured ? (
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1">
            {envStatus.message}
          </h3>

          <div className="space-y-2 text-xs">
            <div>
              <strong>Supabase URL:</strong>{' '}
              {envStatus.details.supabaseUrl.exists ? (
                <span className="text-green-700">
                  ✓ Set ({envStatus.details.supabaseUrl.length} chars)
                </span>
              ) : (
                <span className="text-red-700">✗ Not set</span>
              )}
            </div>

            <div>
              <strong>Supabase Key:</strong>{' '}
              {envStatus.details.supabaseKey.exists ? (
                <span className="text-green-700">
                  ✓ Set ({envStatus.details.supabaseKey.length} chars)
                </span>
              ) : (
                <span className="text-red-700">✗ Not set</span>
              )}
            </div>

            <div>
              <strong>Web3Forms:</strong>{' '}
              {envStatus.details.web3formsKey.exists && !envStatus.details.web3formsKey.isPlaceholder ? (
                <span className="text-green-700">✓ Set</span>
              ) : (
                <span className="text-yellow-700">⚠ Not configured (emails won't send)</span>
              )}
            </div>
          </div>

          {!envStatus.configured && envStatus.instructions && (
            <div className="mt-3 p-3 bg-white rounded border border-yellow-300">
              <p className="font-semibold text-xs mb-2">🔧 How to fix:</p>
              <ol className="text-xs space-y-1 list-decimal list-inside">
                <li>{envStatus.instructions.step1}</li>
                <li>{envStatus.instructions.step2}</li>
                <li>{envStatus.instructions.step3}</li>
                <li>{envStatus.instructions.step4}</li>
                <li>{envStatus.instructions.step5}</li>
              </ol>
            </div>
          )}

          <button
            onClick={checkEnv}
            className="mt-3 flex items-center gap-2 text-xs font-medium text-gray-700 hover:text-gray-900"
          >
            <RefreshCw className="w-3 h-3" />
            Recheck Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
