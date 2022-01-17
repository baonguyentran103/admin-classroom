import axios from "axios";
import { useRouter } from "next/router";
import { DashboardLayout } from '../components/dashboard-layout';
import React, { useState, useEffect } from "react";
const withAuth =  (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        Router.replace("/login");
        return null;
      }
      // If this is an accessToken we just render the component that was passed with all its props
      return(
      <DashboardLayout>
      <WrappedComponent {...props} />
      </DashboardLayout>
      );
    }
    // If we are on server, return null
    return null;
  };
};
export default withAuth;