import { HomeBanner } from "components/home-banner/home-banner.component";
import BuyInThreeSteps from "components/buy-in-three-steps/buy-in-three-steps.component";
import Review from "components/review/review.component";
import Subscribe from "components/subscribe/subscribe.component";
import { WhyLinkaVet } from "components/why-honeyman/why-linkavet.component";
import GeneralAppShell from "layout/app/general-app-shell";
import React, { useEffect } from "react";
import { getConfiguration } from "redux/action/initial.action";

const WelcomePage: React.FC = () => {
  useEffect(() => {
    // debugger
    getConfiguration()
  }, [])
  return (
    <GeneralAppShell>
      {/* Banner */}
      <HomeBanner />

      {/* startup in 3 steps */}
      <BuyInThreeSteps />

      {/* subscribe */}
      <Subscribe />

      {/* Why */}
      <WhyLinkaVet />
      {/* reviews */}
      <Review />

      {/* product list */}
    </GeneralAppShell>
  );
};

export default WelcomePage;
