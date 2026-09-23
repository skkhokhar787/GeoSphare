import React from "react";
import { Clock, TrendingUp, Phone, Globe } from "lucide-react";
import FactCard from "./FactCard";

const QuickFacts = ({ country }) => {
  const timezones = country?.timezones?.length
    ? country.timezones.slice(0, 2).join(", ") +
      (country.timezones.length > 2
        ? ` +${country.timezones.length - 2} more`
        : "")
    : "UTC+00:00";

  const moreData = country?.timezones?.length || 1;

  const gini = country?.gini
    ? `${country.gini} index`
    : "35.0 (Est)";

  const callingCode = country?.callingCodes?.length
    ? `+${country.callingCodes.join(", +")}`
    : "+1";

  const tld = country?.topLevelDomain?.length
    ? country.topLevelDomain.join(", ")
    : ".org";

  return (
    <section className="w-full max-w-container-max mx-auto px-4 sm:px-margin-safe py-6 sm:py-8">
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-gutter">

        <FactCard
          title="TimeZones"
          icon={Clock}
          moreData={moreData}
          data={timezones}
        />

        <FactCard
          title="Gini Coefficient"
          icon={TrendingUp}
          data={gini}
        />

        <FactCard
          title="Calling Code"
          icon={Phone}
          data={callingCode}
        />

        <FactCard
          title="Top Level Domain"
          icon={Globe}
          data={tld}
        />

      </div>
    </section>
  );
};

export default QuickFacts;