// components/ErrorBoundary.js

import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate that an error has been caught
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error caught by Error Boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Customize this UI for your needs (fallback UI)
      return (
        <div style={{ padding: '20px', backgroundColor: '#f8d7da', color: '#721c24' }}>
          <h2>Something went wrong!</h2>
          <p>Please try again later.</p>
          {/* Optionally render error info */}
          {this.state.errorInfo && (
            <details>
              <summary>Details</summary>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }

    // Otherwise, render the children as usual
    return this.props.children;
  }
}

export default ErrorBoundary;
