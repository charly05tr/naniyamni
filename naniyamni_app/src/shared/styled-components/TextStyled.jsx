import styled from "styled-components";

export const Label = styled.label`
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
`;

export const Title = ({text, margin=true}) => {
  text =   text?.toLowerCase()
  .replace(/(^|\s)([a-záéíóúüñ])/g, (_, sep, char) => sep + char.toUpperCase());
  return (
    <h1 className={`md:text-3xl text-2xl font-medium tracking-wide text-gray-700 dark:text-[#F9FAFB]/85 ${(margin)?"mt-2 mb-4":""}`}>{text}</h1>
  );
}


export const Text = ({children}) => {
  return (
    <p className="m-1  text-ellipsis text-left text-zinc-700 font-sans">{children}</p>
  );
}