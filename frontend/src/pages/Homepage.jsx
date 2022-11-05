import ValueProposition from '../components/HomepageComponents/ValueProposition';
import UpcomingReleases from '../components/HomepageComponents/UpcomingReleases';
import Footer from '../components/Footer';

function Homepage() {
  return (
    <>
      <div className="hero">
        <ValueProposition />
        <UpcomingReleases />
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
