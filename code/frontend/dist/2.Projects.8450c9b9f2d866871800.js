webpackJsonp([2],{437:function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,n,a,c,u=o(4),_=r(u),i=o(2),s=r(i),f=o(3),d=r(f),p=o(6),m=r(p),j=o(5),P=r(j),h=o(1),x=r(h),w=o(53),y=o(86),T=r(y),v=o(57),b=r(v),C=o(54),N=r(C),E=o(63),g=o(536),k=r(g),M=(l=(0,w.reduxForm)({form:"newProject"}),l((c=a=function(e){function t(){var e,o,r,l;(0,s.default)(this,t);for(var n=arguments.length,a=Array(n),c=0;c<n;c++)a[c]=arguments[c];return o=r=(0,m.default)(this,(e=t.__proto__||(0,_.default)(t)).call.apply(e,[this].concat(a))),r.state={open:r.props.open||!1},r.close=function(){r.setState({open:!1}),r.props.onRequestClose&&r.props.onRequestClose()},l=o,(0,m.default)(r,l)}return(0,P.default)(t,e),(0,d.default)(t,[{key:"componentWillReceiveProps",value:function(e){e.open&&this.setState({open:!0})}},{key:"render",value:function(){var e=this.state.open,t=this.props.handleSubmit,o=[x.default.createElement(b.default,{label:"Cancel",secondary:!0,onClick:this.close}),x.default.createElement(b.default,{label:"Create",primary:!0,onClick:this.props.submit})];return x.default.createElement(T.default,{title:"New Project",modal:!1,actions:o,open:e,onRequestClose:this.close,contentClassName:k.default.container},x.default.createElement("div",{className:k.default.inputs},x.default.createElement("form",{onSubmit:t},x.default.createElement(w.Field,{name:"name",component:N.default,validate:[E.required],label:"Project Name"}))))}}]),t}(h.Component),a.propTypes={open:h.PropTypes.bool,onRequestClose:h.PropTypes.func.isRequired,submit:h.PropTypes.func.isRequired,handleSubmit:h.PropTypes.func.isRequired},n=c))||n);t.default=M},438:function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.NewProjectTile=void 0;var l=o(1),n=r(l),a=o(16),c=r(a),u=o(792),_=r(u),i=o(537),s=r(i),f="6rem",d={width:f,height:f},p="#979797",m="#616161",j=t.NewProjectTile=function(e){var t=e.onClick;return n.default.createElement(c.default,{className:s.default.container,onClick:t},n.default.createElement(_.default,{color:p,hoverColor:m,style:d}))};j.propTypes={onClick:l.PropTypes.func},t.default=j},439:function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.ProjectTile=void 0;var l=o(41),n=r(l),a=o(1),c=r(a),u=o(16),_=r(u),i=o(58),s=r(i),f=o(335),d=r(f),p=o(538),m=r(p),j=t.ProjectTile=function(e){var t=e.project,o=e.onSelect,r=e.onDelete,l=e.showDelete;return c.default.createElement(_.default,{className:m.default.container},c.default.createElement("div",{className:m.default.top},c.default.createElement("span",{className:m.default.name,onClick:function(){return o(t)}},t.name),l&&r?c.default.createElement(s.default,{tooltip:"delete",onClick:r},c.default.createElement(d.default,null)):null),c.default.createElement("span",{className:m.default.owner},(0,n.default)(t.createdBy)?t.createdBy.displayName:t.createdBy||"No Owner"))};j.propTypes={project:a.PropTypes.object.isRequired,onSelect:a.PropTypes.func.isRequired,onDelete:a.PropTypes.func.isRequired,showDelete:a.PropTypes.bool},t.default=j},440:function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,n,a,c,u,_=o(150),i=r(_),s=o(4),f=r(s),d=o(2),p=r(d),m=o(3),j=r(m),P=o(6),h=r(P),x=o(5),w=r(x),y=o(295),T=r(y),v=o(1),b=r(v),C=o(24),N=o(31),E=o(17),g=o(75),k=o(117),M=r(k),S=o(439),R=r(S),D=o(438),q=r(D),O=o(437),B=r(O),J=o(539),Y=r(J),A=[{child:"createdBy",root:"users",keyProp:"uid"}],F=(l=(0,N.firebaseConnect)([{path:"projects",populates:A}]),n=(0,C.connect)(function(e,t){var o=e.firebase;t.params;return{auth:(0,N.pathToJS)(o,"auth"),projects:(0,N.populatedDataToJS)(o,"projects",A)}}),(0,g.UserIsAuthenticated)(a=l(a=n((u=c=function(e){function t(){var e,o,r,l;(0,p.default)(this,t);for(var n=arguments.length,a=Array(n),c=0;c<n;c++)a[c]=arguments[c];return o=r=(0,h.default)(this,(e=t.__proto__||(0,f.default)(t)).call.apply(e,[this].concat(a))),r.state={newProjectModal:!1,addProjectModal:!1},r.newSubmit=function(e){var t=r.props.firebase.pushWithMeta;return t("projects",e).then(function(){return r.setState({newProjectModal:!1})}).catch(function(e){console.error("error creating new project",e)})},r.deleteProject=function(e){return r.props.firebase.remove("projects/"+e).then(function(){})},r.toggleModal=function(e,t){r.setState((0,i.default)({},e+"Modal",!r.state[e+"Modal"]))},l=o,(0,h.default)(r,l)}return(0,w.default)(t,e),(0,j.default)(t,[{key:"render",value:function(){var e=this,t=this.props,o=t.projects,r=t.auth;if(!(0,N.isLoaded)(o,r))return b.default.createElement(M.default,null);if(this.props.children)return(0,v.cloneElement)(this.props.children,this.props);var l=this.state.newProjectModal;return b.default.createElement("div",{className:Y.default.container},l&&b.default.createElement(B.default,{open:l,onSubmit:this.newSubmit,onRequestClose:function(){return e.toggleModal("newProject")}}),b.default.createElement("div",{className:Y.default.tiles},b.default.createElement(q.default,{onClick:function(){return e.toggleModal("newProject")}}),!(0,N.isEmpty)(o)&&(0,T.default)(o,function(t,o){return b.default.createElement(R.default,{key:"Project-"+o,project:t,onCollabClick:e.collabClick,onSelect:function(){return e.context.router.push(E.LIST_PATH+"/"+o)},onDelete:function(){return e.deleteProject(o)},showDelete:r&&t.createdBy&&t.createdBy.uid===r.uid})})))}}]),t}(v.Component),c.contextTypes={router:b.default.PropTypes.object.isRequired},c.propTypes={projects:v.PropTypes.object,firebase:v.PropTypes.object,auth:v.PropTypes.object,children:v.PropTypes.object},a=u))||a)||a)||a);t.default=F},536:function(e,t){e.exports={buttons:"NewProjectDialog__buttons___2RfwJ",flex:"NewProjectDialog__flex___1aVPi","flex-column":"NewProjectDialog__flex-column___1J1Rx","flex-column-center":"NewProjectDialog__flex-column-center___2H_Nr","flex-row":"NewProjectDialog__flex-row___CGkPL","flex-row-center":"NewProjectDialog__flex-row-center___3LYrA",inputs:"NewProjectDialog__inputs___3o7ef",container:"NewProjectDialog__container___2naoy"}},537:function(e,t){e.exports={container:"NewProjectTile__container___HRlOk",flex:"NewProjectTile__flex___4wGxd","flex-column":"NewProjectTile__flex-column___jmFl_","flex-column-center":"NewProjectTile__flex-column-center___27aeW","flex-row":"NewProjectTile__flex-row___1-FFx","flex-row-center":"NewProjectTile__flex-row-center___1j8H7"}},538:function(e,t){e.exports={collaborator:"ProjectTile__collaborator___2_edT",collaborators:"ProjectTile__collaborators___2uOy7",container:"ProjectTile__container___2mlyY",flex:"ProjectTile__flex___keWpD","flex-column":"ProjectTile__flex-column___39rfx","flex-column-center":"ProjectTile__flex-column-center___3YK5Y","flex-row":"ProjectTile__flex-row___1z_kj","flex-row-center":"ProjectTile__flex-row-center___4G8Vx",settings:"ProjectTile__settings___38tjH",top:"ProjectTile__top___BBRtU",name:"ProjectTile__name___1sJOu",owner:"ProjectTile__owner___1QLna",add:"ProjectTile__add___l2CgF"}},539:function(e,t){e.exports={container:"ProjectsContainer__container___1kCL7",flex:"ProjectsContainer__flex___1zGYu","flex-column":"ProjectsContainer__flex-column___3-kIo","flex-column-center":"ProjectsContainer__flex-column-center___2tYh_","flex-row":"ProjectsContainer__flex-row___3NnV6","flex-row-center":"ProjectsContainer__flex-row-center___2aEYS",progress:"ProjectsContainer__progress___xiObt",tiles:"ProjectsContainer__tiles___3JUax"}},792:function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=o(1),n=r(l),a=o(20),c=r(a),u=o(18),_=r(u),i=function(e){return n.default.createElement(_.default,e,n.default.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"}))};i=(0,c.default)(i),i.displayName="ContentAddCircle",i.muiName="SvgIcon",t.default=i}});