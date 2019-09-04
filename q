[1mdiff --git a/components/me/UserJobList.js b/components/me/UserJobList.js[m
[1mindex eb7ee3d..4a8f5d9 100644[m
[1m--- a/components/me/UserJobList.js[m
[1m+++ b/components/me/UserJobList.js[m
[36m@@ -2,7 +2,6 @@[m [mimport { useState, useEffect } from "react";[m
 import { Input, Menu, Segment } from "semantic-ui-react";[m
 import Icon from "../common/UI/Icon";[m
 import JobList from "../jobs/JobList/JobList";[m
[31m-import { getAuthToken } from "../../data/auth";[m
 [m
 import { Query } from "react-apollo";[m
 import gql from "graphql-tag";[m
[36m@@ -133,31 +132,30 @@[m [mconst userJobList = () => {[m
         </Menu>[m
         <Segment attached="bottom">[m
           {activeItem === "recommended" && ([m
[31m-            <Query query={USER_RECOMMENDED_JOBS} ssr={true}>[m
[32m+[m[32m            <Query query={USER_RECOMMENDED_JOBS} >[m
               {({ error, loading, data }) => {[m
                 if (error) return <p>Something went wrong</p>;[m
                 if (loading) return <p>Loading Awesome Jobs</p>;[m
[31m-[m
[32m+[m[32m                if (!data.me) return <p>Please wait</p>;[m
                 return <JobList jobs={formatJobs(data)} />;[m
               }}[m
             </Query>[m
           )}[m
           {activeItem === "favorites" && ([m
[31m-            <Query query={USER_FAVORITED_JOBS} ssr={true}>[m
[32m+[m[32m            <Query query={USER_FAVORITED_JOBS} >[m
               {({ error, loading, data }) => {[m
                 if (error) return <p>Something went wrong</p>;[m
                 if (loading) return <p>Loading Awesome Jobs</p>;[m
[31m-[m
[32m+[m[32m                if (!data.me) return <p>Please wait</p>;[m
                 return <JobList jobs={formatJobs(data)} />;[m
               }}[m
             </Query>[m
           )}[m
           {activeItem === "applied" && ([m
[31m-            <Query query={USER_APPLIED_JOBS} ssr={true}>[m
[32m+[m[32m            <Query query={USER_APPLIED_JOBS} >[m
               {({ error, loading, data }) => {[m
                 if (error) return <p>Something went wrong</p>;[m
                 if (loading) return <p>Loading Awesome Jobs</p>;[m
[31m-[m
                 return <JobList jobs={formatJobs(data)} />;[m
               }}[m
             </Query>[m
[1mdiff --git a/components/users/LoginForm.js b/components/users/LoginForm.js[m
[1mindex ba08bf2..4b3127d 100644[m
[1m--- a/components/users/LoginForm.js[m
[1m+++ b/components/users/LoginForm.js[m
[36m@@ -4,6 +4,7 @@[m [mimport gql from "graphql-tag";[m
 import InputField from "../common/UI/Input/InputField";[m
 import Button from "../common/UI/Button";[m
 import { AUTHORIZE_USER } from "../hoc/WithAuth";[m
[32m+[m[32mimport {  CHECK_USER_APPLICATION_STATUS_QUERY } from '../common/UI/ApplyToJobButton';[m
 import Router from "next/router";[m
 // import { logInUser } from "../../data/auth";[m
 [m
[36m@@ -55,7 +56,8 @@[m [mconst loginForm = props => {[m
 [m
       if (res.data.login && !props.noredirect) {[m
         // logInUser(res.data.login);[m
[31m-        Router.push("/dashboard");[m
[32m+[m[41m       [m
[32m+[m[32m        Router.push("/me");[m
       }[m
     }[m
   };[m
[36m@@ -90,6 +92,7 @@[m [mconst loginForm = props => {[m
         }}[m
         refetchQueries={[[m
           { query: AUTHORIZE_USER },[m
[32m+[m[32m          {query:  CHECK_USER_APPLICATION_STATUS_QUERY},[m
           ...(props.refetchQueries || [])[m
         ]}[m
       >[m
[1mdiff --git a/components/users/RegisterForm.js b/components/users/RegisterForm.js[m
[1mindex 71ea0c6..0fbb94d 100644[m
[1m--- a/components/users/RegisterForm.js[m
[1m+++ b/components/users/RegisterForm.js[m
[36m@@ -5,6 +5,7 @@[m [mimport InputField from "../common/UI/Input/InputField";[m
 import Button from "../common/UI/Button";[m
 import Router from "next/router";[m
 import { AUTHORIZE_USER } from "../hoc/WithAuth";[m
[32m+[m[32mimport {  CHECK_USER_APPLICATION_STATUS_QUERY } from '../common/UI/ApplyToJobButton';[m
 [m
 // import { logInUser } from "../../../data/auth";[m
 [m
[36m@@ -63,6 +64,7 @@[m [mconst registerForm = props => {[m
 [m
       if (res.data.signup && !props.noredirect) {[m
         // logInUser(res.data.signup);[m
[32m+[m[32m        console.log("Registered");[m
         Router.push("/resumes/upload");[m
       }[m
     }[m
[36m@@ -101,6 +103,7 @@[m [mconst registerForm = props => {[m
         variables={{ ...signUpData }}[m
         refetchQueries={[[m
           { query: AUTHORIZE_USER },[m
[32m+[m[32m          {query:  CHECK_USER_APPLICATION_STATUS_QUERY},[m
           ...(props.refetchQueries || [])[m
         ]}[m
       >[m
