import styled from 'styled-components';

const FtrArea = styled.div.attrs({
  id: 'app-ftr'
})`
  text-align:center;
  margin: 42px 0;
`

export default function Footer(props) {

  return (
    <div className="container">
      <FtrArea>
        <a href="/feedback/submit" title="Submit Feedback">Submit Feedback or a Bug</a>
      </FtrArea>
    </div>

  )
}