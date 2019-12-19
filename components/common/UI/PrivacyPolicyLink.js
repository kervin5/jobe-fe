import React from "react";
import { Button, Header, Icon, Image, Modal } from "semantic-ui-react";

const ModalExampleScrollingContent = () => (
  <Modal
    trigger={
      <p>
        By clicking the "Register" button, you agree to{" "}
        <a href="#">our Privacy Policy</a>
      </p>
    }
  >
    <Modal.Header>Exact Staff, Inc. Privacy Policy</Modal.Header>
    <Modal.Content image scrolling>
      <Modal.Description>
        <div className="policyContent">
          <p>Effective Date: August 1, 2017 </p>

          <p>
            Exact Staff, Inc. respects your privacy. As such, we have developed
            the following Privacy Policy. This Privacy Policy applies to (1) our
            job candidates/applicants, (2) our associates, who are people we
            source or place on assignment with one of our clients, or
            individuals to whom we provide career transition services, (3) users
            of the websites, apps, and online resources and (4) representatives
            of our clients and vendors. This Policy does not apply to our
            headquarters and branch-based staff employees, who are individuals
            employed by Exact Staff, Inc. and who work directly for Exact Staff,
            Inc. and not directly with an Exact Staff, Inc. client.{" "}
          </p>

          <p>
            The Policy explains the types of personal information we collect,
            how we use the information, with whom we share it, and the rights of
            individuals regarding use of their information. It also addresses
            the measures we take to protect the security of the information.{" "}
          </p>

          <h2>Information We Collect </h2>

          <p>
            We collect personal information about you in various ways, such as
            through our online application process, website, social media
            channels; documents you provide to us, information obtained at our
            events and through phone and fax; through job applications and in
            connection with in-person recruitment; and in connection with our
            interactions with clients and vendors. We may collect the following
            types of personal information (as permitted under federal, state and
            local law):{" "}
          </p>

          <ul>
            <li>
              contact information (such as name, postal address, email address
              and telephone number);user name and password when you register on
              any of our online sites;
            </li>

            <li>
              payment information (such as pay card number, expiration date,
              authorization number or security code);
            </li>

            <li>
              information you provide about friends or other people you would
              like us to contact; and other information you may provide to us,
              such as in surveys or other features on our sites.
            </li>
          </ul>

          <p>
            In addition, if you are an associate or job candidate and you apply
            for a position or create an account to apply for a position, we may
            collect the following types of personal information (as permitted
            under federal state and local law):{" "}
          </p>

          <ul>
            <li>employment and education history;</li>

            <li>bank account information;</li>

            <li>citizenship and work authorization status;</li>

            <li>disabilities and health-related information;</li>

            <li>
              results of drug tests and criminal and other background checks;
            </li>

            <li>benefits information;</li>

            <li>tax-related information;</li>

            <li>information provided by references;</li>

            <li>
              information contained in your resume or C.V., information you
              provide regarding your career interests, and other information
              about your qualifications for employment.
            </li>

            <li>language proficiencies and other work-related skills;</li>

            <li>
              Social Security number, national identifier or other
              government-issued identification number;
            </li>

            <li>date of birth;</li>

            <li>gender;</li>
          </ul>

          <p>
            In addition, we may collect information you provide to us about
            other individuals, such as information related to emergency
            contacts.{" "}
          </p>

          <h2>How We Use The Information We Collect </h2>

          <p>
            We use the information described above to perform the following
            activities (as permitted under federal, state and/or local law):{" "}
          </p>

          <ul>
            <li>
              Providing workforce solutions and connecting people to work;
            </li>

            <li>creating and managing online accounts;</li>

            <li>processing payments;</li>

            <li>managing our client and vendor relationships;</li>

            <li>
              sending promotional materials, alerts regarding available
              positions and other communications;
            </li>

            <li>
              communicating about, and administering participation in, special
              events, promotions, programs, offers, surveys, contests and market
              research;
            </li>

            <li>responding to individuals’ inquiries;</li>

            <li>
              operating, evaluating and improving our business (including
              developing, enhancing, analyzing and improving our services;
              managing our communications; performing data analytics; and
              performing accounting, auditing and other internal functions);
            </li>

            <li>
              protecting against, identifying and seeking to prevent fraud and
              other unlawful activity, claims and other liabilities; and
              complying with and enforcing applicable legal requirements,
              relevant industry standards, contractual obligations and our
              policies.
            </li>
          </ul>

          <p>
            In addition to the activities listed above, if you are an associate
            or job candidate and you apply for a position or create an account
            to apply for a position, we use the information described in this
            Privacy Policy to:{" "}
          </p>

          <ul>
            <li>Provide you with job opportunities and work;</li>

            <li>
              provide HR services to you, including administration of benefit
              programs, payroll, performance management and disciplinary
              actions;
            </li>

            <li>
              provide additional services to you, such as training, career
              counseling and career transition services;
            </li>

            <li>
              assess your suitability as a job candidate and your associate
              qualifications for positions; and perform data analytics, such as
              (i) analyzing our job candidate and associate base; (ii) assessing
              individual performance and capabilities, including scoring on
              work-related skills; (iii) identifying skill shortages; (iv) using
              information to match individuals and potential opportunities, and
              (v) analyzing pipeline data (trends regarding hiring practices).
            </li>
          </ul>

          <p>
            We also may use the information in other ways for which we provide
            specific notice at or prior to the time of collection.{" "}
          </p>

          <h2>Information We Share </h2>

          <p>
            We do not disclose personal information we collect about you, except
            as described in this Privacy Policy or in separate notices provided
            in connection with particular activities. We share personal
            information with vendors who perform services on our behalf based on
            our instructions. We do not authorize these vendors to use or
            disclose the information except as necessary to perform services on
            our behalf or comply with legal requirements. We also may share your
            personal information (i) with our subsidiaries and affiliates; (ii)
            if you are a job candidate, with clients who may have job
            opportunities available or interest in placing our job candidates;
            and (iii) with others with whom we work, such as job placement
            consultants and subcontractors, to find you a job.{" "}
          </p>

          <p>
            In addition, we may disclose information about you (i) if we are
            required to do so by law or legal process; (ii) to law enforcement
            authorities or other government officials based on a lawful
            disclosure request; and (iii) when we believe disclosure is
            necessary or appropriate to prevent physical harm or financial loss,
            or in connection with an investigation of suspected or actual
            fraudulent or illegal activity. We also reserve the right to
            transfer personal information we have about you in the event we sell
            or transfer all or a portion of our business or assets (including in
            the event of a reorganization, dissolution or liquidation).{" "}
          </p>

          <h2>Your Rights And Choices </h2>

          <p>
            We offer you certain choices in connection with the personal
            information we collect about you and how we communicate with you. To
            update your preferences, ask us to remove your information from our
            mailing lists, exercise your rights or submit a request, please
            contact us as indicated below. To the extent provided by the law of
            your jurisdiction, you may request access to the personal
            information we maintain about you or request that we correct, amend,
            delete or block the information by contacting us as indicated below.
            Where provided by law, you may withdraw any consent you previously
            provided to us or object at any time on legitimate grounds to the
            processing of your personal information, and we will apply your
            preferences going forward.{" "}
          </p>

          <h2>Notice To California Residents </h2>

          <p>
            Subject to certain limitations, California residents may ask us to
            provide them with (i) a list of certain categories of personal
            information that we have disclosed to third parties for their direct
            marketing purposes during the immediately preceding calendar year,
            and (ii) the identity of those third parties. To make this request,
            California residents may contact us as set forth below.{" "}
          </p>

          <h2>How We Protect Personal Information </h2>

          <p>
            We maintain administrative, technical and physical safeguards
            designed to protect the personal information you provide against
            accidental, unlawful or unauthorized destruction, loss, alteration,
            access, disclosure or use.{" "}
          </p>

          <h2>Links To Third-Party Sites, Apps and Services </h2>

          <p>
            For your convenience and information, our Sites may provide links to
            third-party sites, apps and services that may be operated by
            companies not affiliated with Exact Staff, Inc. These companies may
            have their own privacy notices or policies, which we strongly
            suggest you review. We are not responsible for the privacy practices
            of any non-Exact Staff, Inc. sites, apps or services.{" "}
          </p>

          <h2>Updates To Our Privacy Policy </h2>

          <p>
            This Privacy Policy may be updated periodically to reflect changes
            in our personal information practices. For significant changes, we
            will notify you by posting a prominent notice on our Sites
            indicating at the top of the Policy when it was most recently
            updated.{" "}
          </p>

          <h2>How To Contact Us </h2>

          <p>
            If you have any questions or comments about this Privacy Policy,
            would like to exercise your rights or would like us to update
            information we have about you or your preferences, please write to:{" "}
          </p>

          <p>Exact Staff, Inc. </p>

          <p>Attn: I.T. Department </p>

          <p>21031 Ventura Blvd., Suite 501 </p>

          <p>Woodland Hills, CA 91364</p>
          <style jsx>{`
            .policyContent {
              with: 100%;
              max-width: 800px;
            }
          `}</style>
        </div>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      {/* <Button type="button" primary>
        Continue <Icon name="chevron right" />
      </Button> */}
    </Modal.Actions>
  </Modal>
);

export default ModalExampleScrollingContent;
