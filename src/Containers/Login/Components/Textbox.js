import styled from 'styled-components'

export const Textbox = styled.input`
            
            background-color: transparent;
            border: 1px solid white;
            border-radius: 5px; 
            height: 30%; 
            color: white;
            cursor: ${props=>props.primary?"pointer":""}
`