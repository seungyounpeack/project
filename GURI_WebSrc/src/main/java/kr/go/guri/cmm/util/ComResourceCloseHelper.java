package kr.go.guri.cmm.util;

import java.io.Closeable;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Wrapper;

/**
 *
 * @author 신용삼
 * @since 2019. 07. 08.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2019.07.08.   	신용삼          최초 생성
 *   
 * </pre>
 */
public class ComResourceCloseHelper {
	/**
	 * Resource close 처리.
	 * @param resources
	 */
	public static void close(Closeable  ... resources) {
		for (Closeable resource : resources) {
			if (resource != null) {
				try {
					resource.close();
				} catch (IOException ignore) {//KISA 보안약점 조치 (2018-10-29, 윤창원)
					ComBasicLogger.ignore("Occurred IOException to close resource is ingored!!");
				} catch (Exception ignore) {
					ComBasicLogger.ignore("Occurred Exception to close resource is ingored!!");
				}
			}
		}
	}
	
	/**
	 * JDBC 관련 resource 객체 close 처리
	 * @param objects
	 */
	public static void closeDBObjects(Wrapper ... objects) {
		for (Object object : objects) {
			if (object != null) {
				if (object instanceof ResultSet) {
					try {
						((ResultSet)object).close();
					} catch (SQLException ignore) {//KISA 보안약점 조치 (2018-10-29, 윤창원)
						ComBasicLogger.ignore("Occurred SQLException to close resource is ingored!!");
					} catch (Exception ignore) {
						ComBasicLogger.ignore("Occurred Exception to close resource is ingored!!");
					}
				} else if (object instanceof Statement) {
					try {
						((Statement)object).close();
					} catch (SQLException ignore) {//KISA 보안약점 조치 (2018-10-29, 윤창원)
						ComBasicLogger.ignore("Occurred SQLException to close resource is ingored!!");
					} catch (Exception ignore) {
						ComBasicLogger.ignore("Occurred Exception to close resource is ingored!!");
					}
				} else if (object instanceof Connection) {
					try {
						((Connection)object).close();
					} catch (SQLException ignore) {
						ComBasicLogger.ignore("Occurred SQLException to close resource is ingored!!");
					} catch (Exception ignore) {
						ComBasicLogger.ignore("Occurred Exception to close resource is ingored!!");
					}
				} else {
					//throw new IllegalArgumentException("Wrapper type is not found : " + object.toString());
				}
			}
		}
	}
	
	/**
	 * Socket 관련 resource 객체 close 처리
	 * @param objects
	 */
	public static void closeSocketObjects(Socket socket, ServerSocket server) {
		if (socket != null) {
			try {
				socket.shutdownOutput();
			} catch (IOException ignore) {
				ComBasicLogger.ignore("Occurred IOException to close resource is ingored!!");
			} catch (Exception ignore) {
				ComBasicLogger.ignore("Occurred Exception to shutdown ouput is ignored!!");
			}
			
			try {
				socket.close();
			} catch (IOException ignore) {
				ComBasicLogger.ignore("Occurred IOException to close resource is ingored!!");
			} catch (Exception ignore) {
				ComBasicLogger.ignore("Occurred Exception to close resource is ignored!!");
			}
		}
		
		if (server != null) {
			try {
				server.close();
			} catch (IOException ignore) {
				ComBasicLogger.ignore("Occurred IOException to close resource is ingored!!");
			} catch (Exception ignore) {
				ComBasicLogger.ignore("Occurred Exception to close resource is ignored!!");
			}
		}
	}
	
	/**
	 *  Socket 관련 resource 객체 close 처리
	 *  
	 * @param sockets
	 */
	public static void closeSockets(Socket ... sockets) {
		for (Socket socket : sockets) {
			if (socket != null) {
				try {
					socket.shutdownOutput();
				} catch (IOException ignore) {
					ComBasicLogger.ignore("Occurred IOException to close resource is ingored!!");
				} catch (Exception ignore) {
					ComBasicLogger.ignore("Occurred Exception to shutdown ouput is ignored!!");
				}
				
				try {
					socket.close();
				} catch (IOException ignore) {
					ComBasicLogger.ignore("Occurred IOException to close resource is ingored!!");
				} catch (Exception ignore) {
					ComBasicLogger.ignore("Occurred Exception to close resource is ignored!!");
				}
			}
		}
	}
}