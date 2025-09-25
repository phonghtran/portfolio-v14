export default function CodingSection() {
  return (
    <div>
      <div className="imageGrid">
        <img
          id="img1"
          src="/images/projects/obviously-3/miroboard.jpg"
          alt="all the ideas on one board with the audits"
        />{' '}
        <small className="mb-8 mt-2  block">
          The extensive planning and tracking of all the possible ideas for
          saving costs.
        </small>
        <img
          id="img2"
          src="/images/projects/obviously-3/mapping.png"
          alt="mapping out the service journey"
        />
        <small className="mb-8 mt-2  block">
          Meeting in person to map out the user journeys to find secret hacks
          and workarounds. This revealed the "anxiety loop" of our internal
          users.
        </small>
        <img
          id="img3"
          src="/images/projects/obviously-3/businesslogic.png"
          alt="mapping the business logic thresholds"
        />{' '}
        <small className="mb-8 mt-2  block">
          Mapping how the solutions would affect different teams throughout the
          company.
        </small>
        <img
          id="img4"
          src="/images/projects/obviously-3/workshop.png"
          alt="group discussion"
        />
        <small className="mb-8 mt-2  block">
          Internal workshop to vet ideas.
        </small>
        <img
          id="img5"
          src="/images/projects/obviously-3/statusboard.png"
          alt="status board of tasks to deadlines"
        />{' '}
        <small className="mb-8 mt-2  block">
          Early mockups to build the dashboard and track the activity status of
          all the content and creators.
        </small>
      </div>
    </div>
  );
}
