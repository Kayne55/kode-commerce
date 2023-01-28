import { Helmet } from 'react-helmet-async';
import PageHero from '../components/theme/KsPageHero';
import '../scss/main.scss';
import '../scss/ks-page-section.scss';
import KsButton from '../components/theme/KsButton';
import FeaturedProducts from '../components/FeaturedProducts';

function HomePage() {
  const heroData = {
    height: 95,
    bg: 'https://suzukicycles.com/-/media/project/cycles/images/category/motorcycles/adventure/2023_adventure_cph_2500x1227_f.jpg?mw=2560&w=2560&hash=E9F7A9E06A8E3D83A7E05CFDC156322C',
    title: 'The best ride',
    subtitle: 'of your life',
    ctatext: 'Find your adventure',
    ctalink: '/search/',
    bodytext:
      'Face plant Whistler huck slash north shore bro steed ski bum 180. Hurl carcass free ride apres pow stoked huck BB. Drop hero death cookies heli, stunt couloir sucker hole sketching whip big ring huck bowl.',
  };

  return (
    <div>
      <Helmet>
        <title>Kode Store</title>
      </Helmet>
      <PageHero {...heroData} />
      <section className="ks-section" style={{ minHeight: '100vh' }}>
        <div className="ks-section-body-left">
          <div className="ks-section-heading">
            <h2>Your Safety</h2>
            <hr />
          </div>
          <h3 className="ks-section-subheading ks-text-white">Depends on it</h3>

          <div className="ks-section-body-text">
            <p>
              Liftie ski bum park, shred rail carbon butter 360 whip rig pow
              sharkbite. 360 brain bucket schwag berm backside face plant
              newschooler flowy glades. Clipless gnar back country, fatty grip
              tape pow pow gear jammer Whistler. Trucks hardtail white room
              pillow popping, stoked dirtbag snake bite ski bum fatty backside.
              Dope white room spin, bail wheels skid glades newschooler wack
              bonk ride around DH bomb hole. Park rat endo Ski brain bucket rail
              dust on crust gorby.
            </p>
          </div>
          <KsButton variant="light" name="Do some cool shit" />
        </div>
        <div
          className="ks-section-image-right"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1585210256590-fc52fd1e8348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW90b2Nyb3NzfGVufDB8fDB8fA%3D%3D&w=1000&q=80)',
          }}
        ></div>
      </section>

      <section className="ks-section ks-section-fullwidth ks-section-align-right">
        <div className="ks-section-heading">
          <hr className="ks-hr-primary" />
          <h2 className="ks-text-accent-blue">Front Runners</h2>
        </div>
        <h3 className="ks-section-subheading text-end ks-text-darkgrey">
          Featured Products
        </h3>
        <p className="ks-section-body-text">
          Liftie ski bum park, shred rail carbon butter 360 whip rig pow
          sharkbite. 360 brain bucket schwag berm backside face plant
          newschooler flowy glades.
        </p>
        <div className="kode-products">
          <FeaturedProducts />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
