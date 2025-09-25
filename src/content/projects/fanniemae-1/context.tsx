import Image from 'next/image';

export default function CodingSection() {
  return (
    <div>
      <p>
        Every project at Fannie Mae needs to do a bit more than the original
        request. Fannie Mae suffered from a vicious cycle of churn and tech
        debt, and a culture that adapted around it instead of tackling it. So
        each project since I joined is an attempt to bring more value per
        project, but also jar loose the rigid culture throughout the teams.
      </p>
      <p>
        BUBD is a mechanism to adjust pricing of loans very minutely to entice
        banks to transfer the loans to Fannie Mae. One of the revenue steams is
        to package these loans into more attractive pools of loans that are
        resold to the broader market.
      </p>
      <p>
        The issue that was brought to the Product side is that the internal
        business people could only price these loans very broadly. Only the
        general categories like 30-year or 15-year loans. If one loan was from
        New York versus Texas, there was no way to tell the system to
        differentiate those two.
      </p>
      <p>
        In the past, the team would have done the most minimal effort to get
        that feature into the system. Never assessing if there was a bigger
        opportunity, or if the company would even see any return on investing
        into a feature.
      </p>

      <Image
        src="/images/projects/fanniemae-1/bubd_IMG_2013.jpg"
        alt="chart of pains and gains for a user"
        width={1200}
        height={584}
        className="w-full h-auto object-contain rounded"
      />
      <small>
        Forcing our teams to connect solutions back to users' pain points and
        wants.
      </small>
    </div>
  );
}
