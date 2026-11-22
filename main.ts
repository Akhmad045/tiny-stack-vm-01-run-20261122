import{readFileSync,readdirSync,mkdirSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const E=new TextEncoder(),I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function R(P,Q){
const n=P.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
let s=0,c=0,l=0,q=0,pc=0,t=0;
const X=e=>[o.slice(0,l),e];
for(;;){
if(t===1e6)return X(10);
if(pc<0||pc>=n)return X(9);
const b=P[pc];let m=0,g=0,h=0;
switch(b){
case 0:case 52:break;
case 1:m=1;h=1;break;
case 2:m=4;h=1;break;
case 3:g=1;break;
case 4:g=1;h=2;break;
case 5:case 6:g=2;h=b-3;break;
case 7:g=3;h=3;break;
case 0x17:case 0x1b:g=1;h=1;break;
case 0x10:case 0x11:case 0x12:case 0x13:case 0x14:case 0x15:case 0x16:case 0x18:case 0x19:case 0x1a:case 0x1c:case 0x1d:case 0x1e:case 0x20:case 0x21:case 0x22:g=2;h=1;break;
case 0x30:m=2;break;
case 0x31:case 0x32:m=2;g=1;break;
case 0x33:m=2;break;
case 0x40:g=1;h=1;break;
case 0x41:g=2;break;
case 0x50:case 0x51:case 0x53:g=1;break;
case 0x52:h=1;break;
default:return X(5);
}
if(pc+m>=n)return X(9);
t++;const nx=pc+1+m;
if(s<g)return X(2);
if(s-g+h>256)return X(3);
pc=nx;
switch(b){
case 0:return X(0);
case 1:D[s++]=(P[nx-1]<<24)>>24;break;
case 2:D[s++]=P[nx-4]|P[nx-3]<<8|P[nx-2]<<16|P[nx-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v;break;}
case 0x17:D[s-1]=-D[s-1]|0;break;
case 0x1b:D[s-1]=~D[s-1];break;
case 0x30:case 0x31:case 0x32:{const r=((P[nx-2]|P[nx-1]<<8)<<16)>>16;let j=b===0x30;if(!j){const v=D[--s];j=b===0x31?v===0:v!==0;}if(j)pc=nx+r;break;}
case 0x33:if(c===64)return X(7);C[c++]=nx;pc=P[nx-2]|P[nx-1]<<8;break;
case 0x34:if(!c)return X(8);pc=C[--c];break;
case 0x40:{const a=D[s-1];if(a<0||a>255)return X(6);D[s-1]=M[a];break;}
case 0x41:{const a=D[s-1],v=D[s-2];if(a<0||a>255)return X(6);s-=2;M[a]=v;break;}
case 0x50:{const d=E.encode(String(D[s-1]));if(l+d.length>65536)return X(11);s--;o.set(d,l);l+=d.length;break;}
case 0x51:if(l+1>65536)return X(11);o[l++]=D[--s]&255;break;
case 0x52:D[s++]=q<Q.length?Q[q++]:-1;break;
case 0x53:return X(D[--s]&255);
default:{const y=D[s-1],x=D[s-2];let r;
if(b===0x10)r=x+y|0;
else if(b===0x11)r=x-y|0;
else if(b===0x12)r=Math.imul(x,y);
else if(b===0x13){if(!y)return X(4);r=x===-2147483648&&y===-1?x:(x/y)|0;}
else if(b===0x14){if(!y)return X(4);r=y===-1?0:x%y|0;}
else if(b===0x15){if(!y)return X(4);r=Math.floor((x>>>0)/(y>>>0))|0;}
else if(b===0x16){if(!y)return X(4);r=(x>>>0)%(y>>>0)|0;}
else if(b===0x18)r=x&y;
else if(b===0x19)r=x|y;
else if(b===0x1a)r=x^y;
else if(b===0x1c)r=x<<(y&31);
else if(b===0x1d)r=x>>(y&31);
else if(b===0x1e)r=(x>>>(y&31))|0;
else if(b===0x20)r=x===y?1:0;
else if(b===0x21)r=x<y?1:0;
else r=(x>>>0)<(y>>>0)?1:0;
s-=2;D[s++]=r;}
}
}
}
for(const d of readdirSync(I).sort()){
const P=readFileSync(join(I,d,'program.bin'));let Q;
try{Q=readFileSync(join(I,d,'input.bin'))}catch{Q=Buffer.alloc(0)}
const[a,e]=R(P,Q);
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,'stdout.bin'),a);
writeFileSync(join(O,d,'exit.txt'),e+'\n');
}
