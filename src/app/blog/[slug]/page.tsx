import { getPostById } from "@/lib/post";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { title, date, contentHtml } = await getPostById(id);

  return (
    <>
      <div>
        <h1>{title}</h1>
        <p>{date.toString()}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </>
  );
}
