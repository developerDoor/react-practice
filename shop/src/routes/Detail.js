import {useParams} from "react-router-dom";

function Detail (props) {
	let {id} = useParams();
	// data의 요소중에서 id와 같은 id를 가진것을 찾는다.
	let data = props.shoes.find((e) => e.id == id)
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<img src={'https://codingapple1.github.io/shop/shoes'+ (Number(data.id)) +'.jpg'} width="100%" />
				</div>
				<div className="col-md-6">
					<h4 className="pt-5">{data.title}</h4>
					<p>{data.content}</p>
					<p>{data.price}</p>
					<button className="btn btn-danger">주문하기</button>
				</div>
			</div>
		</div>
	)
}

export default Detail;