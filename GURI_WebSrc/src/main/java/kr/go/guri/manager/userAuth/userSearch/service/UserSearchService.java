package kr.go.guri.manager.userAuth.userSearch.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * 관리자 > 사용자 조회 Service 클래스
 * @author 김부권
 * @since 2022. 06. 21.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *     수정일                         수정자                            수정내용
 *  -----------       -------------   ----------------------
 *  2022.06.21.           김부권                          최초 생성
 *   
 * </pre>
 */


public interface UserSearchService {

	/**
	 * 사용자 조회	
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	List<Map<String, Object>> selectSearchList(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 로딩시 부서 목록 조회
	 * @return
	 * @throws SQLException , IOException
	 */
	List<Map<String, Object>> getDeptAllGetList() throws SQLException , IOException;
	
	/**
	 * 로딩시 직위 목록 조회
	 * @return
	 * @throws SQLException , IOException
	 */
	List<Map<String, Object>> getPositionList() throws SQLException , IOException;
	
}
