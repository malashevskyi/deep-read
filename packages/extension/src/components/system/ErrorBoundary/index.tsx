import React from "react";
// import * as Sentry from "@sentry/react";

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error in React component tree", error, errorInfo);
    // TODO: enable Sentry
    // Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      <div className="fixed top-0 right-0 h-full w-[350px] bg-red-100 border-l border-red-400 p-4 z-[2147483647] flex items-center justify-center">
        <p className="text-red-700 text-center">
          Something went wrong. Please try refreshing the page.
        </p>
      </div>;
    }
    return this.props.children;
  }
}
