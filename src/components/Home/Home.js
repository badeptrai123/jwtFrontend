import "./Home.scss";
export default function Home() {
  return (
    <div className="container-home">
      <div className="container">
        <h1 className="my-4">Getting Started</h1>
        <h2>Try React</h2>
        <p>
          React has been designed from the start for gradual adoption, and{" "}
          <strong>you can use as little or as much React as you need.</strong>{" "}
          Whether you want to get a taste of React, add some interactivity to a
          simple HTML page, or start a complex React-powered app, the links in
          this section will help you get started.
        </p>
        <h3>Online Playgrounds</h3>
        <p>
          If you’re interested in playing around with React, you can use an
          online code playground. Try a Hello World template on CodePen,
          CodeSandbox, or Stackblitz.
        </p>
        <p>
          If you prefer to use your own text editor, you can also download this
          HTML file, edit it, and open it from the local filesystem in your
          browser. It does a slow runtime code transformation, so we’d only
          recommend using this for simple demos.
        </p>
        <h3>Add React to a Website</h3>
        <p>
          You can add React to an HTML page in one minute. You can then either
          gradually expand its presence, or keep it contained to a few dynamic
          widgets.
        </p>
        <h3>Create a New React App</h3>
        <p>
          When starting a React project, a simple HTML page with script tags
          might still be the best option. It only takes a minute to set up!
        </p>
        <p>
          As your application grows, you might want to consider a more
          integrated setup. There are several JavaScript toolchains we recommend
          for larger applications. Each of them can work with little to no
          configuration and lets you take full advantage of the rich React
          ecosystem. Learn how.
        </p>
        <h3>React for Beginners</h3>
        <p>
          If you feel that the React documentation goes at a faster pace than
          you’re comfortable with, check out this overview of React by Tania
          Rascia. It introduces the most important React concepts in a detailed,
          beginner-friendly way. Once you’re done, give the documentation
          another try!
        </p>
        <h3>JavaScript Resources</h3>
        <p>
          The React documentation assumes some familiarity with programming in
          the JavaScript language. You don’t have to be an expert, but it’s
          harder to learn both React and JavaScript at the same time. We
          recommend going through this JavaScript overview to check your
          knowledge level. It will take you between 30 minutes and an hour but
          you will feel more confident learning React.
        </p>
        <h3>Versioned Documentation</h3>
        <p>
          This documentation always reflects the latest stable version of React.
          Since React 16, you can find older versions of the documentation on a
          separate page. Note that documentation for past versions is
          snapshotted at the time of the release, and isn’t being continuously
          updated.
        </p>
        <h3>Something Missing?</h3>
        <p>
          If something is missing in the documentation or if you found some part
          confusing, please file an issue for the documentation repository with
          your suggestions for improvement, or tweet at the @reactjs account. We
          love hearing from you!
        </p>
      </div>
    </div>
  );
}
