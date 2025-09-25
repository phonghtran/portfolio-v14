export default function CodingSection() {
  return (
    <div>
      <div className="imageGrid">
        <img
          id="img1"
          src="/images/projects/obviously-2/tracker.png"
          alt="inefficient spreadsheet tracker made by teammates"
        />
        <small className="mb-8 mt-2  block">
          Secret spreadsheets that our internal services teams maintained
          outside of our software platform. Innovative but ate up a lot of time
          to maintain and socialize to their direct reports.
        </small>

        <img
          id="img2"
          src="/images/projects/obviously-2/createattribute.png"
          alt="simple form to create attributes"
        />
        <small className="mb-8 mt-2 ">
          The simple addition to our admin pages to enable this functionality.
        </small>
        <img
          id="img3"
          src="/images/projects/obviously-2/signupq.png"
          alt="list of attributes in the old UI system"
        />
        <small className="mb-8 mt-2 ">
          Those attributes then enabled more complex features like surveys with
          no additional backend costs.
        </small>
        <img
          id="img4"
          src="/images/projects/obviously-2/fillout.png"
          alt="survey form composed of attributes"
        />
        <small className="mb-8 mt-2 ">
          And the design system could scale to display those attributes to
          external users with almost no design or dev costs.{' '}
        </small>

        <img
          id="img5"
          src="/images/projects/obviously-2/Instagram_reporting_post.png "
          alt="attributes used a taxonomy to filter and sort"
        />

        <small className="mb-8 mt-2 ">
          Each data point was easily accessible by our internal teams negating
          the need for spreadsheets.
        </small>
      </div>
    </div>
  );
}
