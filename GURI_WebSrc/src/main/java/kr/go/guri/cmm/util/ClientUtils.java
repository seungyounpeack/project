package kr.go.guri.cmm.util;

import javax.servlet.http.HttpServletRequest;

public class ClientUtils {
	
	 public static String getRemoteIP(HttpServletRequest req){
         String ip = req.getHeader("X-FORWARDED-FOR"); 
         
         //proxy 환경일 경우
         if (ip == null || ip.length() == 0) {
             ip = req.getHeader("Proxy-Client-IP");
         }
 
         //웹로직 서버일 경우
         if (ip == null || ip.length() == 0) {
             ip = req.getHeader("WL-Proxy-Client-IP");
         }
 
         if (ip == null || ip.length() == 0) {
             ip = req.getRemoteAddr() ;
         }
         
         return ip;
    }
}
