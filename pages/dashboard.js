import Layout from '../components/common/Layout/Layout';
import PageSection from '../components/common/Layout/PageSection';
import WithAuth from '../components/hoc/WithAuth';


const homePage = (props) => {
    return (
        <Layout title={"Home Page"}  hideNav>
            <PageSection className="HomePage" column fullHeight>
              
            </PageSection>
            <style jsx>{`

            `}</style>
        </Layout>
    );
};

export default WithAuth(homePage);
