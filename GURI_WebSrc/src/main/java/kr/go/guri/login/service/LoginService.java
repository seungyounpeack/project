package kr.go.guri.login.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
  * 로그인 Service 클래스
 * @author 김부권
 * @since 2021. 10. 07.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.10.07.   	김부권          최초 생성
 *   
 * </pre>
 */
public interface LoginService {

	
	/**
	 * sso 테이블 유저 ID검색
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	List<Map<String, Object>> selectSearchInfo(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 유저 테이블에서 logon_id 중복 체크
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	int selectCheckUserInfo(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 유저 등록
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	int insertUserInfo(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 유저 로그인
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	Map<String, Object> selectUserLogin(Map<String, Object> param) throws IOException, SQLException;
	
	
	
}
