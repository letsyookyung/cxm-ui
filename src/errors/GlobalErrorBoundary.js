// class GlobalErrorBoundary {
// 	render() {
// 		if (!this.state.shouldHandleError) {
// 		  return this.props.children;
// 		}
// 		if(네트워크 에러) {
// 			return (
// 				<NetworkError onClickRetry={() => this.setState({ shouldHandleError: false})}/>
// 			)
// 		}
// 		if(서버 점검 에러) {
// 			return (
// 				// 서버 점검 에러를 보여준다
// 				<Maintenance />
// 			)
// 		}
// 		return (
// 			<UnknownError onClickRetry={() => this.setState({ shouldHandleError: false})} />
// 		)
// 	}
// }