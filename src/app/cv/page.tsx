export default function cv() {
  return (
    <div
      className="w-screen h-screen overflow-hidden"
      style={{ margin: 0, padding: 0 }}
    >
      <iframe
        src="/cv/index.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="CV"
      ></iframe>
    </div>
  );
}
