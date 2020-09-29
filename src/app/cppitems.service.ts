import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject,  throwError, of, EMPTY} from 'rxjs';
import { catchError } from 'rxjs/operators';
import md from 'markdown-it';
import * as hljs from 'highlight.js';
import * as pmans from './pmans-render';
export interface Item {
  title: string;
  subtitle: string;
  idx: string;
  route: string;
  image: string;
  codelink: string;
  status: number;
  html: string;
  markdown: string;
}

export interface Match {
  idx: string,
  title: string,
  subtitle: string,
  escaped: string;
  route: string;
}

class MatchClass implements Match{
  constructor (
    public idx: string,
    public title: string,
    public subtitle: string,
    public escaped: string,
    public route: string)
  {}
}

class ItemClass implements Item {
  constructor (
    public title: string,
    public subtitle: string,
    public idx: string,
    public route: string,
    public image: string,
    public codelink: string,
    public status: number,
    public html: string,
    public markdown: string)
  {}
}

@Injectable({
  providedIn: 'root'
})
export class CppitemsService {
  private markdown: any;
  public content: string[] = [];
  public items: Item[] = [];

  public showItem: Item;
  public itemError: boolean = false;
  public itemLoaded: boolean = false;
  public showStatus: number =1;
  public ready: boolean = true;
  public find: string ="";
  public matches: Match[] = [];

   private Headers: any = new HttpHeaders();
   private baseUrlRaw: string = "https://raw.githubusercontent.com/cppitems/cppitems/master/items/";
   private baseUrl: string = "https://github.com/cppitems/cppitems/tree/master/items/";
  constructor(private http: HttpClient) {
    this.items.length = 120;
    this.markdown=md({
      html:         false,        // Enable HTML tags in source
      xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                                  // This is only for full CommonMark compatibility.
      breaks:       false,        // Convert '\n' in paragraphs into <br>
      langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                                  // useful for external highlighters.
      linkify:      true,        // Autoconvert URL-like text to links

      // Enable some language-neutral replacement + quotes beautification
      typographer:  false,

      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: '“”‘’',

      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externally.
      // If result starts with <pre... internal wrapper is skipped.
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre ><code><div>' + hljs.highlight(lang, str, true).value + '</div></code></pre>';
            } catch { }
        } else if (lang === 'pmans') {
            try {
                return '<pre class="pmans-render"><code>' + pmans.render(str) + '</code></pre>';
            } catch { }
        }
        return '<pre class="hljs"><code><div>' + this.markdown.utils.escapeHtml(str) + '</div></code></pre>';
    }
    });


    for(let i=0;i!=120;++i){
      let foldername = String(i).padStart(3, '0');
      this.getMarkdownItem(foldername).subscribe(
        content => {
          // console.log('httpget:', content);
        // extract status from first line (and remove line)
        // let render = this.markdown.render(content);
        // this.items.push(new ItemClass(foldername,"image",this.baseUrlRaw+foldername,1,render));
        this.items[i] = this.prepareMarkdown(foldername,content);
        // console.log('makrdown:', content);
        this.sendContentReady();
      }
      );

    }
  }

  private getStatus( content: string){
    let first = content.split('\n')[0];
    let status = first.match(/^(\d+).*/);
    // console.log('status: ' + status[1]);
    return status !== null ? Number(status[1]) : 11;
  }

  private prepareMarkdown(foldername: string, content: string) : ItemClass {
    try{  // extract some implicit properties

      let status = this.getStatus(content)
      // console.log('status: ' + status[1]);

      let second = content.split('\n')[1];
      let title = second.match(/^#\s(.*)/);
      // console.log('title: ' + title[1]);

      // let third = content.split('\n')[2];
      // let subtitle = third.match(/^##\s(.*)/);
      // // console.log('subtitle: ' + subtitle[1]);

      // remove first two line
      let lines = content.split('\n');
      lines.splice(0,2);
      let newfirst = "# "+foldername + ": " + title[1]
      let newcontent = lines.join('\n');
      newcontent = [newfirst, newcontent].join('\n');
      let render = this.markdown.render(newcontent);
      let route = "/item/"+foldername;
      return new ItemClass(title[1],"",foldername,route,"image",this.baseUrl+foldername,Number(status),render,newcontent)
    }
    catch { // if something breaks
      // let status = 11;
      let title = foldername;
      let render = this.markdown.render(content);
      let route = "/item/"+foldername;
      return new ItemClass(title,"",foldername,route,"image",this.baseUrl+foldername,Number(status),render,content)
    }
  }


  private getMarkdownItem(foldername: any): Observable<any> {
    // console.log('getMarkdownItem:' + foldername);
    return this.http.get(this.baseUrlRaw+foldername+'/item.md',{headers: this.Headers ,responseType: 'text'})
    // .pipe(
    //   catchError((err) => {
    //     // console.log(foldername + ': Item not existing (this is no problem)');
    //     return EMPTY
    //   })
    // )
  }



  private contentReady = new Subject<any>();
  sendContentReady() {
    // console.log(this.content);
    this.contentReady.next();
  }
  getContentReady(): Observable<any> {
    return this.contentReady.asObservable();
  }

  private itemReady = new Subject<any>();
  sendItemReady() {
    // console.log(this.showItem);
    this.itemReady.next();
  }
  public getItemReady(foldername:string): Observable<any> {
    this.itemLoaded = false;
    this.getMarkdownItem(foldername).subscribe(
      content => {
        this.showItem = this.prepareMarkdown(foldername,content);
        this.sendItemReady();
        this.itemError = false;
        this.itemLoaded = true;
        // console.log(content);
        // console.log(foldername);
    },
    (err) => {console.log("err1")
    this.itemError = true;
    this.itemLoaded = true;
    this.sendItemReady();}
    // query service to find content
    );
    return this.itemReady.asObservable();
  }


  private resultsReady = new Subject<any>();
  sendResultsReady() {
    // console.log('resultsReady');
    this.resultsReady.next();
  }
  public getResultsReady(value: string): Observable<any> {
    // process

    // clear old matches
    this.matches = [];
    this.find =  value;
    // refresh for allready present items
    for(let i=0;i<this.items.length;++i){
      this.checkMatch(i);
    }
    // and each time a new item is ready
    this.getContentReady().subscribe(data => {
      this.checkMatch(this.items.length-1);
    });

    this.sendResultsReady();
    return this.resultsReady.asObservable();
  }

  private checkMatch(idx: number) {
    // check item for match
    // console.log("checkMatch")
    // modifies results
    let item = this.items[idx];
    let result: string = "";
    if (this.showStatus >= item.status){
      let escaped = this.markdown.utils.escapeHtml(item.markdown)
      let findesc = this.markdown.utils.escapeHtml(this.find);
      let text = escaped;
      // find all matches of pattern and construct 'summary'
      let reg = new RegExp(findesc, 'gi');
      let strstart = '<b>'
      let strend = '</b>'
      let lenstart = strstart.length;
      let lenend = strend.length;
      escaped = escaped.replace(/\n/g, ' ').replace(reg, strstart+'$&'+strend)
      // extract only regions


      let off = 20;
      let n = findesc.length;
      let final = [];
      let start = escaped.indexOf(strstart);
      let end = escaped.indexOf(strend,start+lenstart);
      const maxhits = 20;
      let hits: number = 0;
      let subhits = 0;
      while (start >= 0 && end >= 0 && hits <= maxhits){
        // find gap to next start
        let startn = escaped.indexOf(strstart,end+lenend);
        // while gap < 2*embedd: combine
        let gap = startn-end;
        if (gap < 2*off && startn >=0  ) {
          end = escaped.indexOf(strend,end+lenend);
          subhits += 1;
        } else { // large gap
          // add slice to results
          hits += 1 + subhits;
          subhits = 0;
          let endfinal = Math.min(end+off,escaped.length)
          let startfinal = Math.max(start-off,0)
          let res = escaped.slice(startfinal,endfinal);
          final.push(res);
          // strip
          escaped = escaped.slice(endfinal);
          // reset start/end
          start = escaped.indexOf(strstart);
          end = escaped.indexOf(strend);
        }
      }
      if(final.length>0)
      this.matches.push(new MatchClass(item.idx,item.title,item.subtitle,"..."+final.join("...")+"...",item.route));
    }
    // console.log(this.matches)
    // console.log(this.items)
  }

}
