"use client";

interface Props {
  params: { id: number };
}
export default function PhotosDetailsPage({ params }: Props) {
  return (
    <div>
      PhotosDetailsPage for id: {params.id}
      <div>
        <button className="btn" onClick={() => console.log(params)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
