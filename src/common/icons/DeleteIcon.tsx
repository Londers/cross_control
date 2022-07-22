import React from "react"

function DeleteIcon(props: { width: number, height: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 200 200"
            {...props}
        >
            <image
                y={96.37}
                x={-1.058}
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAwAAAAMACAMAAACkX/C8AAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABXFBMVEUAAADcNTX/VVXeNDTd MzPeNDS/QEDeMzPdMzPeMjLdNDTdMjLdMzPdMzPdMzPdNDTcNDTcMjLdMzPfMjLeMzPeNDTdMzPd NTXeMTHdMzPeMjLdMzPdMzPcNDTdMzPbMTHdMzPcMjLdMzPbMzPdMzPbNDTfNTXeMzPeMTHeMjLd MzPfMzPdMzPeNDTdMzPdNjbcMzPdMDDdMzPcMjLeMTHdMzPdMzPdMzPcNTXeMzPdMzPbNzfdMzPe NzfcMzPdMzPcMjLbMzPdMzPdMjLfNTXdMzPcLi7dMzPdMzPbMTHdMzPhLS3dMzPeNTXeMjLdNDTf MDDdMjLdMzPdMzPdNDTeMjLeMzPdMzPcMjLoLi7eMzPdMzPmMzPdMzPdNDTdMjLjOTnbJCTdMzPd MzPVKyvdNDTcMjLeMzPdMzPMMzPdMzPdMzPdMzPeMzPdMzPdNDTeMzP/AADdMzP///+E5dlWAAAA cnRSTlMAOgNU+6gEofxcU1L6S/hKSUj3R0ZF9kQ+9D3zPDvyOfEz7jLtMTDsLy7rKOcn5iblJeQk H98e3h3d3BzbF9bVoiPjpxjUFtPSFdERzKmiyxDKyQ/JqKmrwAu/vgq9vLsJB7SzBrKxsK8Frqal VaSjoAKRM+TNAAAAAWJLR0RzQQk9zgAAAAd0SU1FB+MIDQksDk9GLbYAAAyQSURBVHja7dpnnxxU HYbh2TUkwd67IvauWCAQAtHFXlAs2HuveL7/C9cX+kMxZDd7ZnbO3Nf1Ef7nuWfmxWw2AAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAABwaY6O3WAtx0duMM9Lrtx31RWW2v+16/e7wiwvvTKGAtba/xgK mOVlLx9DAavtXwFz96+A1favgDle8coxFLDi/hUww6v+s38FrLZ/BVzcq5+3fwWstn8FXNRr/mv/ Clht/wq44P5fO4YCVt6/Ai7idS/YvwJW278C7t3r/8/+FbDa/hUwd/8KWG3/Crg3b3jjGAo4hP0r 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 BMI6GgAAAABJRU5ErkJggg=="
                preserveAspectRatio="none"
                height={203.2}
                width={203.2}
                transform="translate(0 -97)"
            />
        </svg>
    )
}

export default DeleteIcon