'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function DebugPage() {
  const [supabaseStatus, setSupabaseStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSupabase = async () => {
    setIsLoading(true);

    const urlEnv = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const keyEnv = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const web3formsEnv = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    const status = {
      url: {
        exists: !!urlEnv,
        value: urlEnv ? `${urlEnv.substring(0, 30)}...` : 'NOT SET',
        length: urlEnv?.length || 0,
        valid: urlEnv && urlEnv.length > 20
      },
      key: {
        exists: !!keyEnv,
        value: keyEnv ? `${keyEnv.substring(0, 30)}...` : 'NOT SET',
        length: keyEnv?.length || 0,
        valid: keyEnv && keyEnv.length > 100
      },
      web3forms: {
        exists: !!web3formsEnv,
        value: web3formsEnv ? `${web3formsEnv.substring(0, 30)}...` : 'NOT SET',
        length: web3formsEnv?.length || 0,
        valid: web3formsEnv && web3formsEnv.length > 20
      },
      clientInitialized: false,
      storageTest: null
    };

    // Try to initialize Supabase client
    try {
      const { getSupabase } = await import('@/lib/supabase');
      const supabase = await getSupabase();

      if (supabase) {
        status.clientInitialized = true;

        // Test storage access
        try {
          const { data, error } = await supabase.storage.getBucket('gallery');
          if (error) {
            status.storageTest = {
              success: false,
              error: error.message
            };
          } else {
            status.storageTest = {
              success: true,
              bucket: data
            };
          }
        } catch (err: any) {
          status.storageTest = {
            success: false,
            error: err.message
          };
        }
      }
    } catch (err: any) {
      status.storageTest = {
        success: false,
        error: err.message
      };
    }

    setSupabaseStatus(status);
    setIsLoading(false);
  };

  useEffect(() => {
    checkSupabase();
  }, []);

  const StatusIcon = ({ valid }: { valid: boolean }) => {
    if (valid) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Environment Debug Panel</h1>
        <p className="text-gray-600">Check if Supabase and other environment variables are loaded correctly</p>
      </div>

      <div className="mb-4">
        <button
          onClick={checkSupabase}
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Checking...' : 'Refresh Check'}</span>
        </button>
      </div>

      {supabaseStatus && (
        <div className="space-y-6">
          {/* Supabase URL */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Supabase URL</h2>
              <StatusIcon valid={supabaseStatus.url.valid} />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Exists:</span>
                <span className={supabaseStatus.url.exists ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {supabaseStatus.url.exists ? 'YES' : 'NO'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Length:</span>
                <span className="font-mono">{supabaseStatus.url.length} characters</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Value:</span>
                <span className="font-mono text-xs">{supabaseStatus.url.value}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Valid:</span>
                <span className={supabaseStatus.url.valid ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {supabaseStatus.url.valid ? 'YES (>20 chars)' : 'NO (<20 chars)'}
                </span>
              </div>
            </div>
          </div>

          {/* Supabase Anon Key */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Supabase Anon Key</h2>
              <StatusIcon valid={supabaseStatus.key.valid} />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Exists:</span>
                <span className={supabaseStatus.key.exists ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {supabaseStatus.key.exists ? 'YES' : 'NO'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Length:</span>
                <span className="font-mono">{supabaseStatus.key.length} characters</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Value:</span>
                <span className="font-mono text-xs">{supabaseStatus.key.value}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Valid:</span>
                <span className={supabaseStatus.key.valid ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {supabaseStatus.key.valid ? 'YES (>100 chars)' : 'NO (<100 chars)'}
                </span>
              </div>
            </div>
          </div>

          {/* Web3Forms Key */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Web3Forms API Key</h2>
              <StatusIcon valid={supabaseStatus.web3forms.valid} />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Exists:</span>
                <span className={supabaseStatus.web3forms.exists ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {supabaseStatus.web3forms.exists ? 'YES' : 'NO'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Length:</span>
                <span className="font-mono">{supabaseStatus.web3forms.length} characters</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Value:</span>
                <span className="font-mono text-xs">{supabaseStatus.web3forms.value}</span>
              </div>
            </div>
          </div>

          {/* Supabase Client Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Supabase Client</h2>
              <StatusIcon valid={supabaseStatus.clientInitialized} />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Initialized:</span>
                <span className={supabaseStatus.clientInitialized ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {supabaseStatus.clientInitialized ? 'YES' : 'NO'}
                </span>
              </div>
            </div>
          </div>

          {/* Storage Test */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Storage Bucket Test</h2>
              {supabaseStatus.storageTest && (
                <StatusIcon valid={supabaseStatus.storageTest.success} />
              )}
            </div>
            {supabaseStatus.storageTest ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Success:</span>
                  <span className={supabaseStatus.storageTest.success ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                    {supabaseStatus.storageTest.success ? 'YES' : 'NO'}
                  </span>
                </div>
                {supabaseStatus.storageTest.error && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-xs font-mono">{supabaseStatus.storageTest.error}</p>
                  </div>
                )}
                {supabaseStatus.storageTest.bucket && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-xs">✅ Gallery bucket found and accessible!</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No storage test performed</p>
            )}
          </div>

          {/* Overall Status */}
          <div className={`rounded-2xl shadow-lg p-6 ${
            supabaseStatus.url.valid && supabaseStatus.key.valid && supabaseStatus.clientInitialized
              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
              : 'bg-gradient-to-r from-red-500 to-rose-500'
          }`}>
            <div className="flex items-center space-x-3">
              {supabaseStatus.url.valid && supabaseStatus.key.valid && supabaseStatus.clientInitialized ? (
                <>
                  <CheckCircle className="w-8 h-8 text-white" />
                  <div className="text-white">
                    <h3 className="text-xl font-bold">✅ Supabase Connected!</h3>
                    <p className="text-white/90">All environment variables are loaded correctly.</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-8 h-8 text-white" />
                  <div className="text-white">
                    <h3 className="text-xl font-bold">❌ Supabase Not Connected</h3>
                    <p className="text-white/90">Environment variables missing or invalid. Check Vercel settings.</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">🔧 Troubleshooting Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Go to Vercel Dashboard → Your Project → Settings → Environment Variables</li>
              <li>Verify these variables exist:
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                  <li><code className="bg-blue-100 px-2 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code></li>
                  <li><code className="bg-blue-100 px-2 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                  <li><code className="bg-blue-100 px-2 py-0.5 rounded">NEXT_PUBLIC_WEB3FORMS_KEY</code></li>
                </ul>
              </li>
              <li>Make sure all environments are selected (Production, Preview, Development)</li>
              <li>After adding/updating variables: Go to Deployments → Redeploy</li>
              <li>Wait 2-3 minutes for deployment to complete</li>
              <li>Refresh this debug page to see updated status</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
