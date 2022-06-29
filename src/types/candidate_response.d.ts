export interface CandEndpResp {
	data: CandData[]
}

interface CandData {
	id: string
	type: string
	links: Links
	attrs: Attrs
	relationships: Relationships
}

interface Relationships {
	activities: Activities
	department: Activities
	role: Activities
	regions: Activities
	"job-applications": Activities
	questions: Activities
	answers: Activities
	locations: Activities
	uploads: Activities
	"custom-field-values": Activities
	"partner-results": Activities
}

interface Activities {
	links: Links2
}

interface Links2 {
	self: string
	related: string
}

interface Attrs {
	connected: boolean
	"created-at": string
	email: string
	"facebook-id"?: any
	"first-name": string
	internal: boolean
	"last-name": string
	"linkedin-uid"?: any
	"linkedin-url"?: any
	"original-resume"?: any
	phone?: any
	picture?: any
	pitch?: any
	"referring-site"?: any
	"referring-url"?: any
	referred: boolean
	resume?: any
	sourced: boolean
	unsubscribed: boolean
	"updated-at": string
	"facebook-profile"?: any
	"linkedin-profile"?: any
	tags: any[]
}

interface Links {
	self: string
}
