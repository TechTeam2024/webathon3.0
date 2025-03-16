import React from 'react';
import { Loader2 } from 'lucide-react';


export function Loading({ size = 'md', fullScreen = false, message = 'Loading...' }) {
    const sizeMap = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    const containerClasses = fullScreen
        ? 'fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50'
        : 'flex items-center justify-center p-4';

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center gap-3">
                <Loader2 className={`${sizeMap[size]} text-indigo-600 animate-spin`} />
                {message && (
                    <p className="text-gray-600 font-medium text-sm">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}