type GreetingProps = {
  name: string;
};

const Greeting = ({ name }: GreetingProps) => {
  return <p>Hello, {name}!</p>;
};

export default Greeting;
