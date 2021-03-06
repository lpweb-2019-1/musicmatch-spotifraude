import { Injectable } from '@angular/core';
import { isNumber, isString, isObject } from 'util';
import { MusicaComponent } from './musica/musica.component';

@Injectable({
  providedIn: 'root'
})
export class DiscoService {
  generos = [];
  artistas = [];
  musicas = [];

  constructor() {
    this.adicionarGenero('Samba de Raiz');
    this.adicionarGenero('Pop Brasil');
    this.adicionarGenero('Sucessos Gospel');
    this.adicionarGenero('Bossa Nova');

    this.adicionarMusica('O Show Tem Que Continuar', ['Beth Carvalho'], 'Samba de Raiz');
    this.adicionarMusica('Foi Um Rio Que Passou Em Minha Vida', ['Paulinho da Viola'], 'Samba de Raiz');
    this.adicionarMusica('Canta Canta, Minha Gente', ['Martinho Da Vila'], 'Samba de Raiz');
    this.adicionarMusica('Deixa A Vida Me Levar', ['Zeca Pagodinho'], 'Samba de Raiz');
    this.adicionarMusica('Brisa', ['IZA'], 'Pop Brasil');
    this.adicionarMusica('Onda diferente (feat. Papatinho)', ['Anitta', 'Ludmilla', 'Snoop Dogg', 'Papatinho'], 'Pop Brasil');
    this.adicionarMusica('Pior Que Possa Imaginar', ['Luísa Sonza'], 'Pop Brasil');
    this.adicionarMusica('Hoje Lembrei Do Teu Amor', ['Tiago Iorc'], 'Pop Brasil');
    this.adicionarMusica('Ousado Amor', ['Isaias Saad'], 'Sucessos Gospel');
    this.adicionarMusica('Tua Graça Me Basta', ['Davi Sacer', 'Preto no Branco'], 'Sucessos Gospel');
    this.adicionarMusica('Ele Vem - Ao Vivo', ['Gabriel Guedes de Almeida', 'Gabriela Rocha'], 'Sucessos Gospel');
    this.adicionarMusica('Autor da Vida', ['Aline Barros'], 'Sucessos Gospel');
    this.adicionarMusica('Chega de Saudade', ['João Gilberto'], 'Bossa Nova');
    this.adicionarMusica('Samba Da Benção', ['Vinícius de Moraes'], 'Bossa Nova');
    this.adicionarMusica('Desafinado', ['João Gilberto'], 'Bossa Nova');
    this.adicionarMusica('Fotografia', ['Elis Regina', 'Antônio Carlos Jobim'], 'Bossa Nova');
    this.adicionarMusica('Pela luz dos olhos teus', ['Antônio Carlos Jobim', 'Miúcha'], 'Bossa Nova');

  }

  /**
   * Encontra e retorna um gênero na lista de gêneros com base no nome.
   * 
   * @param nome Nome do gênero
   */
  encontrarGeneroPorNome(nome) {
    return this.generos.find(genero => genero.nome == nome);
  }

  /**
   * Encontra e retorna um gênero da lista de gêneros.
   * 
   * @param genero Nome ou identificador do gênero
   */
  encontrarGenero(genero) {
    if (isNumber(genero)) {
      return this.generos.find(g => g.id == genero);
    } else {
      return this.generos.find(g => g.nome == genero);
    }
  }

  /**
   * Adiciona um gênero na lista de gêneros.
   * 
   * @param nome O nome do gênero
   * @param generoPai O nome ou identificador do gênero pai
   */
  adicionarGenero(nome) {
    let genero = this.encontrarGenero(nome);
    if (genero) {
      return genero;
    }
    genero = {
      id: this.generos.length + 1,
      nome
    };
    this.generos.push(genero);
    return genero;
  }

  /**
   * Adicionar um artista na lista de artistas.
   * 
   * @param nome Nome do artista
   */
  adicionarArtista(nome) {
    let artista = this.encontrarArtista(nome);
    if (artista) {
      return artista;
    }
    artista = {
      id: this.artistas.length + 1,
      nome
    };
    this.artistas.push(artista);
    return artista;
  }

  /**
   * Adiciona uma música na lista de músicas. 
   * 
   * Este método verifica os parâmetros para operar da forma correta:
   * 
   * * obtém o objeto correspondente ao parâmetro `genero`; se não existir, cadastra
   * * para cada item do array `artistas`, verifica se ele existe e, caso contrário, o adiciona na lista de artistas
   * 
   * Com base nisso, o método cria o objeto para ser adicionado corretamente na lista de músicas.
   * 
   * @param titulo O título da música
   * @param artistas Os artistas da música; pode ser array de string ou array de número (identificador)
   * @param genero O gênero da música; pode ser string ou identificador
   */
  adicionarMusica(titulo, artistas, genero) {
    let g = this.encontrarGenero(genero);
    if (!g) {
      g = this.adicionarGenero(genero);
    }
    const listaArtistas = [];
    for (const artista of artistas) {
      if (isString(artista)) {
        let a = this.encontrarArtista(artista);
        if (!a) {
          a = this.adicionarArtista(artista);
        }
        listaArtistas.push(a.id);
      } else {
        listaArtistas.push(artista);
      }
    }
    const musica = {
      id: this.musicas.length + 1,
      titulo,
      idGenero: g.id,
      artistas: listaArtistas,
      gostar: 0,
      naoGostar: 0
    };
    this.musicas.push(musica);
    return musica;
  }

  /**
   * Encontra e retorna um artista.
   * 
   * @param id Nome ou identificador do artista
   */
  encontrarArtista(artista) {
    if (isNumber(artista)) {
      return this.artistas.find(a => a.id == artista);
    } else {
      return this.artistas.find(a => a.nome == artista);
    }
  }

  /**
   * Encontra e retorna uma música.
   * 
   * @param musica Título ou identificador da música
   */
  encontrarMusica(musica) {
    if (isNumber(musica)) {
      return this.musicas.find(m => m.id == musica);
    } else {
      return this.musicas.find(m => m.titulo == musica);
    }
  }

  /**
   * Retorna a lista de gêneros, preenchidos com suas músicas
   */
  listaDeGeneros() {
    for (let genero of this.generos) {
      genero.musicas = this.musicas.filter(musica => musica.idGenero == genero.id);
      for (let musica of genero.musicas) {
        this.preencherObjetoMusica(musica);
      }
    }
    return this.generos;
  }

  /**
   * Retorna a lista das músicas, preenchendo os atributos `artistas`
   * e `genero` com os respectivos objetos.
   */
  listaDeMusicas() {
    for (let musica of this.musicas) {
      this.preencherObjetoMusica(musica);
    }
    return this.musicas;
  }

  /**
   * Encontra e retorna a lista de músicas do artista.
   * 
   * @param artista Identificador ou nome do artista
   */
  listaDeMusicasDoArtista(artista) {
    let a = artista;
    if (isNumber(a) || isString(a)) {
      a = this.encontrarArtista(artista);
    }
    let lista = this.musicas.filter(musica =>
      musica.artistas.indexOf(a.id) != -1 || musica.artistas.indexOf(a) != -1
    );
    for (let musica of lista) {
      this.preencherObjetoMusica(musica);
    }
    return lista;
  }

  /**
   * Preenche os atributos da música com objetos para artistas e gênero
   * 
   * @param musica A música
   */
  preencherObjetoMusica(musica) {
    let artistas = [];
    for (const artistaId of musica.artistas) {
      if (!isObject(artistaId)) {
        artistas.push(this.encontrarArtista(artistaId));
      } else {
        artistas.push(artistaId);
      }
    }
    musica.artistas = artistas;
    musica.genero = this.encontrarGenero(musica.idGenero);
  }

  /**
   * Preenche o objeto com a lista de músicas do artista.
   * 
   * @param artista O artista
   */
  preencherObjetoArtista(artista) {
    if (artista) {
      artista.musicas = this.listaDeMusicasDoArtista(artista);
    }
  }

  /**
   * Retorna a lista de artistas e preenche o artibuto `musicas` com a lista das
   * músicas dos respectivos artistas.
   */
  listaDeArtistas() {
    for (let artista of this.artistas) {
      this.preencherObjetoArtista(artista);
    }
    return this.artistas;
  }

  gostar(musica){
    musica.gostar++;
    if(musica.naoGostar >0){
      musica.naoGostar--;
    }
  }
  naoGosta(musica){
    musica.naoGostar++;
    if(musica.gostar >0 ){
      musica.gostar--;
    }
  }
  /**  musicasDoGenero(genero){
    genero.musicas = this.musicas.filter(musica => musica.idGenero == genero.id);
    for(let musica of genero.musicas){
      this.preencherObjetoMusica(musica);
    }
    return genero.musica;
  }
  */
}
