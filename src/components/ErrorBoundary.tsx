
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center space-y-4">
            <div className="text-6xl">⚠️</div>
            <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
            <p className="text-muted-foreground">
              The application encountered an unexpected error. Please refresh the page to try again.
            </p>
            <div className="space-y-2">
              <button 
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Refresh Page
              </button>
              <button 
                onClick={() => this.setState({ hasError: false })}
                className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Try Again
              </button>
            </div>
            {this.state.error && (
              <details className="text-left text-sm bg-muted p-3 rounded mt-4">
                <summary className="cursor-pointer font-medium">Error Details</summary>
                <pre className="mt-2 text-xs overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
