import Navbar from "../common/Navbar";
import Hero from "../views/hero";
import NyxCipher from "../views/nyxCipher";
import Advantage from "../views/advantage";
import NyxToolkit from "../views/nyxToolkit";
import NyxVsPaal from "../views/nyxVsPaal";
import Partnering from "../views/partnering";
import JoinUs from "../views/joinUs";
import Faqs from "../views/faqs";
import Footer from "../views/footer";
import Whale from "../views/whale";

function Home() {

  return (
    <div id='home'>
      <Navbar />
      <Hero />
      <Whale />
      <NyxCipher />
      <Advantage />
      <NyxToolkit />
      <NyxVsPaal />
      <Partnering />
      <JoinUs />
      <Faqs />
      <Footer />
    </div>
  );
}

export default Home;