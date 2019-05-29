import React, { useState, useEffect } from 'react'
import axios from 'axios'

import JobListing from '../../components/jobs/JobListing/JobListing';
import Layout from '../../components/common/Layout/Layout';
import PageSection from '../../components/common/Layout/PageSection/PageSection';
import { statement } from '@babel/template';
import Link from 'next/link';


const show = () => {

    const PostLink = props => (
        <li>
          <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
          </Link>
        </li>
      );

    const [singleJob, setSingleJob] = useState({});

    useEffect(() => {
        axios.get('https://myexactjobsapi.herokuapp.com/api/jobs/5ceeb5fe44541700179dea38')
            .then(response => {
                setSingleJob(response.data);
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
        },[])

    return(
        <Layout>
            <PostLink id="hello-nextjs" title="Hello Next.js" />
        <PageSection>
            <JobListing 
                title={singleJob.title}
                location={singleJob.location}
                business={"Target"}
                about={""}
                description={singleJob.description}
            />
        </PageSection>
    </Layout>
    )
}

export default show