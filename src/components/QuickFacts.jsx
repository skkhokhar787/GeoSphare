import React from 'react';
import { Clock, TrendingUp, Phone, Globe } from 'lucide-react';
import FactCard from './FactCard';

const QuickFacts = ({ country }) => {

  const timezones = country?.timezones?.length ? country.timezones.slice(0, 2).join(', ') + (country.timezones.length > 2 ? ` +${country.timezones.length - 2} more` : '') : 'UTC+00:00';
  const moreData = country?.timezones?.length || 1
  const gini = country?.gini ? `${country.gini} index` : '35.0 (Est)';
  const callingCode = country?.callingCodes?.length ? `+${country.callingCodes.join(', +')}` : '+1';
  const tld = country?.topLevelDomain?.length ? country.topLevelDomain.join(', ') : '.org';

  return (
    <section className="max-w-container-max mx-auto px-margin-safe py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
      
    <FactCard title={"TimeZones"} icon={Clock} moreData={moreData} country={country} data={timezones}/>
    <FactCard title={"Gini Coefficient"} icon={TrendingUp} country={country} data={gini}/>
    <FactCard title={"Calling Code"} icon={Phone} country={country} data={callingCode}/>
    <FactCard title={"Top level domain"} icon={Globe} country={country} data={tld}/>
      

    
      
    </section>
  );
};

export default QuickFacts;