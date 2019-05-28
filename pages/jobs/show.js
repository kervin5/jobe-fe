import React from 'react'

import JobListing from '../../components/jobs/JobListing/JobListing'
import PageSection from '../../components/common/Layout/PageSection/PageSection';
import Layout from '../../components/common/Layout/Layout';


let jobResponsabilities = ["High school diploma or General Education Development (GED) or equivalent", 
"3 months' warehouse experience", 
"3 months' experience operating an electric pallet jack or forklift", 
"Previous experience at Sysco or in foodservice industry"]

let jobQualifications = ["High school diploma or General Education Development (GED) or equivalent", 
"3 months' warehouse experience", 
"3 months' experience operating an electric pallet jack or forklift", 
"Previous experience at Sysco or in foodservice industry"]

const show = () => (
    <Layout>
        <PageSection>
            <JobListing 
                title={"Warehouse"}
                location={"San Fernando"}
                business={"Target"}
                about={"At Sysco, we offer our associates the opportunity to grow personally and professionally, to contribute to the success of a dynamic organization, and to serve others in a manner that exceeds their expectations. We are looking for talented, hard-working individuals to join our team. Come grow with us and let us show you why good things really do come from Sysco."}
                description={"This is a warehouse position responsible for operating an electric pallet jack or forklift, selecting the correct products from warehouse racking, labeling product using SOS label technology, palletizing product as it is selected to build customer orders and delivering product to the dock in a safe and efficient manner. This position requires working 6:00 p.m. until end-of-shift until all product is accurately selected and loaded. Overtime hours and working weekends and holidays are required in order to successfully fill customers' orders. Job requires working in areas with temperature and humidity variations based on local weather conditions, and on selecting environment (Dry, Cooler, Freezer)."}
                responsabilities={this.jobResponsabilities}
                qualifications={this.jobQualifications}
            />
        </PageSection>
    </Layout>
)

export default show