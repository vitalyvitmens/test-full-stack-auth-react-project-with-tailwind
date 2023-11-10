import React from 'react'

export const Loader = () => {
	return (
		<div className="flex flex-col mt-40 items-center text-xl text-amber-950">
			<i className="fa fa-refresh fa-spin fa-5x fa-fw" />
			<span>Loading...</span>
		</div>
	)
}
