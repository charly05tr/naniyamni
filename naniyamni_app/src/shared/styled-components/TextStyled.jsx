import styled from "styled-components";

export const Label = styled.label`
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
`;

export const Title = ({text, margin=true}) => {
  return (
    <h1 className={`text-2xl font-medium tracking-wide text-gray-700" ${(margin)?"mt-2 mb-2":""}`}>{text}</h1>
  );
}

export const Text = styled.p`
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #333;
  line-height: 1.5;
  margin: 0.5rem 0;
`;