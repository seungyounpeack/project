/**
 * @Description		: 공통코드 조회 DAO
 * @Source        	: CommonMapper.java
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

package kr.go.guri.common.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;


@Repository("commonMapper")
public class CommonMapper extends ComAbstractDAO {
	
	
	/**
	 * 권한별 메뉴 목록 조회
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public List<Map<String, Object>> selectRoleMenuList(Map<String, Object> param) throws IOException, SQLException {
		System.out.println("param ::: " + param);
		return selectList("CommonMng.selectRoleMenuList", param);
	}
	
	/**
	 * 유저 권한 조회
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public Map<String, Object> selectGetRoleInfo(Map<String, Object> param) throws IOException, SQLException {
		return selectOne("CommonMng.selectGetRoleInfo", param);
	}
	
	
	/**
	 * 메뉴 권한 체크
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public Map<String, Object> checkRoleMenuCnt(Map<String, Object> param) throws IOException, SQLException {
		System.out.println("실행 2  param : "+ param);
		return selectOne("CommonMng.checkRoleMenuCnt", param);
	}

	
	
	
}
