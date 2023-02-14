/**
 * @Description		: 공통코드 조회 Service
 * @Source        	: CommonService.java
 * @author 			: 신용삼
 * @since 			: 2019. 8. 14. 
 * @version 		: 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2019. 8. 14.    신용삼          최초 생성
 *   
 * </pre>
 */
package kr.go.guri.common.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface CommonService {

	
	
	/**
	 * 권한별 메뉴 목록 조회
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	List<Map<String, Object>> selectRoleMenuList(Map<String, Object> param) throws IOException, SQLException;
	
	
	
	/**
	 * 메뉴 권한 체크
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	Map<String, Object> selectGetRoleInfo(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 메뉴 권한 체크
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	Map<String, Object> checkRoleMenuCnt(Map<String, Object> param) throws IOException, SQLException;

	
}
