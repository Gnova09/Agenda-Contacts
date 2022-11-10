import styled from 'styled-components'

export const DivCenter = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100%;
background: rgb(0,207,251);
background: linear-gradient(90deg, rgba(0,207,251,1) 46%, rgba(0,48,57,1) 100%);

.LoginContainer{
    width: 30%;
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    color: white;
    font-weight: bold;
    gap: 10px;
    

    fieldset{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        border: 1px solid white;
        border-radius: 5px;
        
        legend{
            font-weight: 600;
            font-size: 2rem;
        }
        div{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 70%;
            gap: 5px;
        span{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            
        }
    }
}

}
`

