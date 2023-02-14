package kr.go.guri.manager.userAuth.userAuthSolution.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * 관리자 > 사용자 솔루션 권한 Service 클래스
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


public interface UserAuthSolutionService {

	/**
	 * 솔루션 권한 부여	
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int selectInsertSolutionAuth(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 솔루션 권한 해제
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int selectDeleteSolutionAuth(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 솔루션 유저 리스트
	 * @param param
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> selectSolutionUserList(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 *  유저 리스트
	 * @param param
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> selectUserList(Map<String, Object> param) throws IOException, SQLException;
	/**
	 * solution 권한 cnt
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int selectSolutionUserCnt(Map<String, Object> param) throws IOException, SQLException;
	
	
}
