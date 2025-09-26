export default function ContextSection() {
  return (
    <div className="space-y-6">
      <h3>Solution</h3>

      <p>
        Enter &quot;attributes.&quot; At the heart of every software is the data
        structure. Which means every concept or object in the system is a
        glorified table with columns and rows. By building a simple UI for users
        to effectively just add a column for any given object in a campaign, we
        unlocked a magnitude of flexibility without corrupting the underlying
        functionality.
      </p>
      <p>Each attribute is composed of a few elements:</p>

      <ol className="traditionalOrderedList">
        <li>A name</li>
        <li>A label that the end user would see</li>
        <li>
          The component type (this could be a simple text box, a dropdown or
          even a media uploader)
        </li>
        <li>Permissions of who could view or edit this attribute</li>
        <li>
          A &quot;short code&quot;, this code could be recognized by the system
          anywhere and output the value e.g. #payment# would render your
          payment.
        </li>
      </ol>
    </div>
  );
}
