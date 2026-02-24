const Card = ({ data }) => {
  const { firstName, lastName, about, age, gender, photoUrl } = data;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="user photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl">{firstName + " " + lastName}</h2>
        <h4>{age + " " + gender} </h4>
        <p>{about}</p>
        <div className="card-actions justify-center mt-4 gap-3">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
