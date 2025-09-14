import styled from "styled-components";

export const Label = styled.label`
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
`;

export const Title = ({text, margin=true}) => {
  return (
    <h1 className={`lg:text-3xl md:text-2xl text-xl font-medium tracking-wide text-gray-700 ${(margin)?"mt-2 mb-4":""}`}>{text}</h1>
  );
}


export const Text = ({children}) => {
  return (
    <p className="m-1  text-ellipsis text-left text-zinc-700 font-sans">{children}</p>
  );
}