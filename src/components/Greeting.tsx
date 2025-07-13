type GreetingProps = {
  name: string;
};

export const Greeting = ({ name }: GreetingProps) => {
  return <p>Hello, {name}!</p>;
};
