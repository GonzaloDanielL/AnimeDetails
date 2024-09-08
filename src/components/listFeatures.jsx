export function Generos(props) {
  let generos = [];
  for (let i = 0; i < props.list.length; i++) {
    generos.push(props.list[i].name);
  }
  return generos.join(', ');
}

export function LinksExternal(props) {
  let links = [];
  for (let i = 0; i < props.list.length; i++) {
    links.push(<li key={i}>{props.list[i].name}: <a href={props.list[i].url} target="_blank">{props.list[i].url} </a></li>);
  }
  return links;
}